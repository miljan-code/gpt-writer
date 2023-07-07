'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useCompletion } from 'ai/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { articleWriterFormSchema } from '@/lib/validations/services';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { OutputBox } from '@/components/dashboard/output-box';

type FormData = z.infer<typeof articleWriterFormSchema>;

const outlinePlaceholders = {
  0: 'eg. What is Next.JS',
  1: 'eg. What are the benefits of Next.JS',
};

export const ArticleWriter = () => {
  const router = useRouter();

  const { complete, completion, isLoading } = useCompletion({
    api: `/api/generate/article`,
    onError: error => {
      toast({
        title: 'Something went wrong',
        description: error.message,
      });
    },
    onFinish() {
      router.refresh();
    },
  });

  const prevRef = useRef('');
  const outputDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diff = completion.slice(prevRef.current.length);
    prevRef.current = completion;
    if (!outputDivRef.current) return;
    outputDivRef.current.insertAdjacentText('beforeend', diff);
  }, [completion]);

  const form = useForm<FormData>({
    resolver: zodResolver(articleWriterFormSchema),
    defaultValues: {
      keywords: '',
      title: '',
      outline: [
        {
          value: '',
        },
        {
          value: '',
        },
      ],
      tone: 'Standard',
    },
  });

  const { fields, append } = useFieldArray({
    name: 'outline',
    control: form.control,
  });

  const onSubmit = async (formData: FormData) => {
    let outlines: string[] = [];

    if (formData.outline) {
      outlines = formData.outline
        .map(outline => outline.value || '')
        .filter(outline => outline);
    }

    const prompts = [
      `Write an article with the title "${formData.title}" and the SEO keywords "${formData.keywords}" with a ${formData.tone} writing tone. First, you are going to write an introduction, and then follow the article outline in the following messages.`,
      ...outlines,
    ];

    for (let i = 0; i < prompts.length; i++) {
      await complete(prompts[i]);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="w-full h-full flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Example: nextjs tutorial"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Example: How to create NextJS app"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`outline.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Article Outline
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={
                            outlinePlaceholders[
                              index as keyof typeof outlinePlaceholders
                            ]
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                rounded="md"
                className="mt-2"
                onClick={() => append({ value: '' })}
              >
                Add outline
              </Button>
            </div>
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an article writing tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Creative">Creative</SelectItem>
                      <SelectItem value="Simple">Simple</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="tertiary"
              rounded="md"
              className="mt-4 w-fit"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Generate
              <span className="sr-only">Generate</span>
            </Button>
          </form>
        </Form>
      </div>
      <OutputBox ref={outputDivRef} />
    </div>
  );
};
