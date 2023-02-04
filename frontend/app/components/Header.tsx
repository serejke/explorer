export type HeaderProps = {
  content: string;
}

export function Header({ content }: HeaderProps) {
  return <header className="">
    <div className="mx-auto max-w-7xl py-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">{content}</h1>
    </div>
  </header>;
}