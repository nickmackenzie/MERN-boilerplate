import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';

const { Input, Field, Control, Label } = Form;
export default () => (
    <div>      <Field>
    <Label>Message</Label>
    <Control>
      <Textarea placeholder="Textarea" />
    </Control>
  </Field>
  <Button color="primary">My Bulma button</Button></div>
  
)