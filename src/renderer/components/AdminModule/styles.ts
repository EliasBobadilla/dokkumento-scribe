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
  border: #3366fe 1px solid;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
`
export const DefaultLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-gap: 20px;
`
export const FormListContainer = styled.div`
  height: 400px;
  overflow-y: auto;
`
