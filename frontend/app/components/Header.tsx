import { Form } from '@remix-run/react';

export function Header() {
  return (
    <header className='flex mx-auto'>
      <img
        width={75}
        src={'/images/explorer_logo.jpeg'}
        alt='Explorer'
        title='Explorer'
      />
      <Form method="post" className="width-1/2">
        <div>
          <label>
            <input
              className="border-gray-200"
              type="text"
              // defaultValue={actionData?.fields?.name}
              placeholder={'Search by Block Number/Hash or by Transaction Hash'}
              name="search-string"
            />
          </label>
        </div>
      </Form>
    </header>
  );
}