import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 1.5em;
  width: 100%;
  height: 10vh;
  background-color: #4434ad;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: relative;
  gap: 1.5em;
`

export const Section = styled.div`
  min-width: 20%;
`

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 1em;
  color: #fff;
  margin-right: 1em;
  justify-content: right;
  position: absolute;
  right: calc(1.2em + 40px);
`
