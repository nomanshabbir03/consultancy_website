/** Hidden anti-bot field: invisible to people and assistive tech, bots tend to fill it and the API then silently discards the form. */
export default function Honeypot({ id }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
      <label htmlFor={id}>Leave this field empty</label>
      <input type="text" name="company_website" id={id} tabIndex={-1} autoComplete="off" />
    </div>
  );
}
