import styled from '@emotion/styled'
import { background } from '../../helpers/image'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginForm = styled.div`
  width: 25%;
  height: 400px;
  background-color: rgba(250, 250, 250, 0.8);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);
  border-radius: 10px;
  padding: 80px 50px;
  position: relative;
`

export const LoginFooter = styled.div`
  height: 20px;
  width: calc(100% - 100px);
  font-size: 1em;
  color: #fff;
  position: absolute;
  bottom: 10px;
  text-align: center;
`
