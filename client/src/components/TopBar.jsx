import Button from './Button';

export default function Topbar() {
  return (
    <header
      className="
        h-16
        border-b border-white/10
        flex items-center justify-end
        px-10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <Button variant="secondary">Logout</Button>
    </header>
  );
}
