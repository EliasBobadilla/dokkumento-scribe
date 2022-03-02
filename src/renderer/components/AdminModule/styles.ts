import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 2em;
`

export const FormDataSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  align-items: left;
  gap: 10px;
`

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  align-items: left;
  gap: 10px;
  border: #000 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`
