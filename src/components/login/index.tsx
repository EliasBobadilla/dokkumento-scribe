import React from "react";
import { Button, Pane, Text, majorScale } from "evergreen-ui";
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'

const Demo = styled('div')`
  background: darkgreen;  
  width: 100wh;
  height: 100vh;
`

const Login = () => {
  return (
    <Demo>
      <Button>Click me!</Button>
      <Text>This is a clickable Button</Text>
      <h3>Hello From Electron App</h3>
      <h4>Electron: {process.versions.electron}</h4>
      <h4>Chrome: {process.versions.chrome}</h4>
      <h4>Node: {process.versions.node}</h4>
      <div>Hola!</div>
    </Demo>
  );
};

export default Login;
