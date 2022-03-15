import styled from '@emotion/styled'

export const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  margin: 0;
`

export const FormSection = styled.div`
  padding: 1.5em;
  height: 80vh;
  bottom: 2px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  // grid-auto-rows: min-content;
  // grid-gap: 25px;
`

export const ButtonSection = styled.div`
  background-color: #4434ad;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
`
