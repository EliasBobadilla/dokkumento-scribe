import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  height: 8vh;
  background: #52bd95;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: relative;
`

export const Section = styled.div`
  min-width: 20%;
  margin-left: 1em;
`

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 0.9em;
  color: #000000;
  margin-right: 1em;
  justify-content: right;
  position: absolute;
  right: calc(1em + 40px);
`
