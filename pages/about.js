import Link from 'next/link'
import cowsay from 'cowsay-browser';

export default function About() {
  return (
    <div>
      <div>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
      </div>
      <pre>{cowsay.say({ text: 'Hey george' })}</pre>
    </div>
  )
}
