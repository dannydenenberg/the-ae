import cowsay from 'cowsay-browser'

// pages/404.js
export default function Custom404 () {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <pre>
        {cowsay.think({ text: 'Hmmm...where am i' })}
      </pre>
    </>
  )
}
