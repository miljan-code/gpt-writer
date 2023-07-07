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

// TODO: delete later
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed tincidunt dolor. Phasellus aliquam augue sit amet placerat luctus. Nullam vel elit nec erat varius imperdiet pellentesque et quam. Etiam diam dolor, feugiat in venenatis et, fringilla lacinia mi. Curabitur id ornare lacus. Vestibulum eget dignissim massa, id tempor est. Aenean consequat magna vitae vestibulum varius. Donec pulvinar a libero nec commodo. Vivamus tempus id libero posuere cursus. Etiam eu massa non nulla pretium ullamcorper sed non lacus. Nunc eu varius elit. Nulla mollis vitae metus aliquet laoreet. Suspendisse lobortis vitae leo et blandit. Donec semper ante sit amet magna tincidunt, et eleifend tellus semper.

Mauris a sapien mauris. Etiam ut augue eu urna faucibus lobortis ut et nulla. Nam pharetra risus mauris, non posuere ex consequat ac. Nullam sed arcu feugiat quam vulputate eleifend et vel neque. Praesent sit amet varius odio. Praesent et egestas orci. Fusce aliquet, sapien eu fringilla tincidunt, ante eros volutpat urna, non lobortis lorem nunc ut nulla.

Vestibulum varius elit id tellus cursus, feugiat volutpat lorem tempor. Sed sollicitudin mollis lacus suscipit tristique. Aenean ultrices tempor enim. In nec gravida turpis, vitae pharetra dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat odio id massa vulputate mollis. In ullamcorper et dolor et consectetur. Donec imperdiet lacus sollicitudin orci hendrerit, quis efficitur sem dignissim. Aliquam scelerisque nibh ut congue molestie. In sit amet nulla vel diam interdum bibendum. Sed rhoncus blandit urna. Morbi molestie a augue a vulputate.

Vestibulum vestibulum ex et lobortis placerat. Proin non tincidunt velit. Proin rhoncus eleifend lectus, vitae molestie nisi lacinia vel. Quisque ut pharetra lacus, rhoncus accumsan tellus. Proin ultricies vulputate ex placerat consectetur. Vivamus mi turpis, rutrum sed diam vel, porttitor efficitur erat. Vivamus feugiat arcu ut porta ullamcorper. Mauris id gravida ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse eget enim diam. Morbi vitae placerat purus. Curabitur eu lacinia turpis. Mauris sed urna nisi. Vestibulum nec sollicitudin massa.

Vestibulum mollis convallis tortor, eu pulvinar nulla aliquam eget. Suspendisse elementum eu erat vestibulum semper. Sed posuere ex enim, id viverra ex ornare ut. Quisque eget augue varius, dignissim odio ut, aliquet lorem. Morbi eu mauris neque. In at nisi velit. Nulla purus dolor, congue quis dictum quis, viverra et tellus. Nunc feugiat feugiat lacus, vitae luctus felis aliquam vitae. Donec imperdiet purus dui, eget ornare nisl porttitor in. In scelerisque sodales hendrerit. Nullam laoreet elementum enim, id posuere turpis ultricies nec. Mauris sagittis molestie nisi vulputate tempus. Aliquam sed massa in justo dapibus varius. Fusce a purus accumsan, porttitor quam sed, sodales purus. Aliquam erat volutpat. Nunc elementum porta lorem.

Aliquam faucibus, nibh et sagittis sodales, justo ligula blandit quam, at dignissim magna augue eu urna. Vestibulum at ullamcorper urna. Nunc finibus tempus dapibus. Nam imperdiet semper dui, at luctus nulla mollis vel. Suspendisse sit amet nisl tortor. Donec ac tempor nibh. Cras at lectus ac velit vestibulum pellentesque a sit amet nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce vehicula mauris ac massa iaculis, sed dapibus nunc ultrices. Donec a ligula ut diam mattis consequat a nec nisi. Nulla sed blandit tellus.

Quisque vitae tincidunt velit. Phasellus mollis, ipsum eu varius venenatis, dolor eros viverra diam, gravida tincidunt velit mi vel ligula. Cras ac quam ut libero varius euismod. Sed condimentum eget elit in vehicula. Sed in ex nec eros consectetur ultricies. Nunc ipsum tortor, dictum elementum aliquam ullamcorper, blandit tincidunt massa. Suspendisse ut urna nec sem porta sodales. Ut cursus pharetra consequat. Fusce pretium tincidunt varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed porta ipsum risus, in sagittis erat congue at. Nulla mollis imperdiet metus placerat mattis. Vivamus porttitor sapien non egestas pulvinar.

Nulla iaculis sem finibus, gravida justo vel, facilisis dui. Quisque imperdiet justo sem, id scelerisque nunc commodo lobortis. Aliquam posuere leo a quam consectetur, sit amet elementum leo aliquet. Etiam pellentesque placerat risus sed fringilla. Aliquam aliquet diam ac metus interdum, sit amet euismod nisl sodales. Nullam eu enim interdum, faucibus sem ut, tempus tortor. Nam feugiat pulvinar scelerisque. Nunc gravida diam vel odio tempus, et congue libero varius. Praesent ut lacinia augue.

Cras placerat et ligula in aliquam. Curabitur ut felis eget justo molestie accumsan. Donec sit amet venenatis ex, id viverra ipsum. Morbi blandit hendrerit tempor. Phasellus massa erat, tempus gravida ligula bibendum, mollis sodales risus. Quisque eu tellus vitae tellus laoreet scelerisque nec eget nunc. Nam nec pulvinar nisl, tincidunt congue lectus. Nulla ut augue dui. Nulla facilisis faucibus porttitor. Praesent ultricies orci ut sapien euismod euismod.

Maecenas a lectus sit amet dolor consequat ultrices. Aliquam erat volutpat. Nam non nisi eu mauris molestie lobortis viverra vel felis. Donec viverra leo sapien, a cursus augue dignissim sed.`;

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

  // TODO: test purposes, remove later
  const insertText = () => {
    if (!outputDivRef.current) return null;
    outputDivRef.current.insertAdjacentHTML('beforeend', lorem);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-col">
          <div className="mb-4 pb-4 border-b border-border/50">
            <h2 className="font-heading text-3xl">Article Writer</h2>
            <p className="text-muted">
              Generate cutting-edge content in less than a minute.
            </p>
          </div>
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
          {/* TODO: test purposes */}
          <Button
            variant="outline"
            rounded="md"
            size="sm"
            className="mt-4 w-fit"
            onClick={insertText}
          >
            InsertText
          </Button>
        </div>
      </div>
      <OutputBox ref={outputDivRef} />
    </div>
  );
};
