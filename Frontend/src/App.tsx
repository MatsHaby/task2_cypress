import './App.css'

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

import { HiMail } from 'react-icons/hi';

function App() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block text-start">
          <Label htmlFor="email1" className="text-white" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" icon={HiMail} required />
      </div>
      <div>
        <div className="mb-2 block text-start">
          <Label htmlFor="password1" className="text-white" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-white">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );

}

export default App
