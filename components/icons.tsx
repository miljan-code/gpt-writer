import { Menu, X, type LucideProps } from 'lucide-react';

export const Icons = {
  menu: Menu,
  close: X,
  logo: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="36px"
      height="36px"
      baseProfile="basic"
      className="pt-0.5"
      {...props}
    >
      <path
        fill="#fff"
        d="M12.5,41L12.5,41C8.91,41,6,38.09,6,34.5v-2c0-3.59,2.91-6.5,6.5-6.5h0c1.933,0,3.5,1.567,3.5,3.5v8	C16,39.433,14.433,41,12.5,41z"
      />
      <path
        fill="#fff"
        d="M51.5,41L51.5,41c3.59,0,6.5-2.91,6.5-6.5v-2c0-3.59-2.91-6.5-6.5-6.5h0c-1.933,0-3.5,1.567-3.5,3.5	v8C48,39.433,49.567,41,51.5,41z"
      />
      <rect width="4" height="7" x="30" y="10" fill="#fff" />
      <path
        fill="#198cff"
        d="M43,52H21c-5.523,0-10-4.477-10-10V25c0-5.523,4.477-10,10-10h22c5.523,0,10,4.477,10,10v17	C53,47.523,48.523,52,43,52z"
      />
      <path
        fill="#fff"
        d="M11,25v5c2.762,0,5-2.239,5-5c0-2.757,2.243-5,5-5c2.762,0,5-2.239,5-5h-5 C15.477,15,11,19.477,11,25z"
        opacity=".3"
      />
      <path
        d="M53,42v-5c-2.762,0-5,2.239-5,5c0,2.757-2.243,5-5,5c-2.762,0-5,2.239-5,5h5 C48.523,52,53,47.523,53,42z"
        opacity=".15"
      />
      <circle cx="32" cy="8" r="4" fill="#fff" />
      <circle cx="22" cy="33" r="4" fill="#fff" />
      <circle cx="42" cy="33" r="4" fill="#fff" />
    </svg>
  ),
};
