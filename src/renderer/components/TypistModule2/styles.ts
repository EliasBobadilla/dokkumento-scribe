import styled from '@emotion/styled'

export const Container = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  overflow: hidden;
`

export const FormSection = styled.div`
  padding-top: 2em;
  height: 84vh;
  bottom: 2px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 25px;
`

export const ButtonSection = styled.div`
  border-top: #52bd95 solid 1px;
  height: 8vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`