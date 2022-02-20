/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  Button,
  SelectMenu,
  TagInput,
  EditIcon,
  ManualIcon,
} from 'evergreen-ui'
import styled from '@emotion/styled'
import { useAppContext } from '../context'
import { FieldTypeModel } from '../models/fieldTypes'
import { ProjectModel } from '../models/projects'
import { CurrentFormModel, FormFieldModel, FormModel } from '../models/form'

const Container = styled.div`
  width: 100%;
  height: 8vh;
  background: #52bd95;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: relative;
`

const Section = styled.div`
  min-width: 20%;
  margin-left: 1em;
`

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 0.9em;
  color: #000000;
  margin-right: 1em;
  justify-content: right;
  position: absolute;
  right: 1em;
`

interface Props {
  selectedProjectId: number
  setSelectedProjectId: (value: number) => void
  selectedFormId: number
  setSelectedFormId: (value: number) => void
}

const Header = ({
  selectedProjectId,
  setSelectedProjectId,
  selectedFormId,
  setSelectedFormId,
}: Props) => {
  const {
    userContext,
    roleContext,
    projectContext,
    formContext,
    setFieldTypeContext,
    setFormContext,
    setProjectContext,
  } = useAppContext()

  const projectList = projectContext.map((p) => ({
    label: p.Name,
    value: p.Id,
  }))

  const projectPlaceholder = 'Selecciona un proyecto'

  const formList = formContext.Forms.map((p) => ({
    label: p.Name,
    value: p.Id,
  }))

  const formPlaceholder = 'Selecciona un formulario'

  const [batch, setBatch] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const fieldTypes = await window.electron.ipc.invoke<FieldTypeModel[]>(
        'getFieldTypes',
        null,
      )
      const projects = await window.electron.ipc.invoke<ProjectModel[]>(
        'getProjects',
        null,
      )
      setFieldTypeContext(fieldTypes)
      setProjectContext(projects)
    })()
  }, [])

  useEffect(() => {
    if (!selectedProjectId) return
    const request = { projectId: selectedProjectId }
    ;(async () => {
      const formFields = await window.electron.ipc.invoke<FormFieldModel[]>(
        'getFormFields',
        request,
      )
      const forms = await window.electron.ipc.invoke<FormModel[]>(
        'getForms',
        request,
      )
      const currentForms: CurrentFormModel = {
        Forms: forms,
        FormFields: formFields,
      }
      setFormContext(currentForms)
    })()
  }, [selectedProjectId])

  const handleBatchChange = (values: string[]) => {
    const lastItem = values.pop()
    setBatch([lastItem!.toUpperCase()])
  }

  return (
    <Container>
      <Section>
        <SelectMenu
          title={projectPlaceholder}
          options={projectList}
          selected={selectedProjectId.toString()}
          hasFilter={false}
          hasTitle={false}
          onSelect={(item) => setSelectedProjectId(+item.value)}
        >
          <Button width='100%' iconBefore={ManualIcon}>
            {projectList.find((x) => x.value === selectedProjectId)?.label ||
              projectPlaceholder}
          </Button>
        </SelectMenu>
      </Section>
      <Section>
        <SelectMenu
          title={formPlaceholder}
          options={formList}
          selected={selectedFormId.toString()}
          hasFilter={false}
          hasTitle={false}
          onSelect={(item) => setSelectedFormId(+item.value)}
        >
          <Button width='100%' iconBefore={EditIcon}>
            {formList.find((x) => x.value === selectedFormId)?.label ||
              formPlaceholder}
          </Button>
        </SelectMenu>
      </Section>
      <Section>
        <TagInput
          inputProps={{ placeholder: 'Lote' }}
          values={batch}
          width='100%'
          disabled={selectedFormId <= 0 || selectedProjectId <= 0}
          onChange={(values) => {
            handleBatchChange(values)
          }}
        />
      </Section>
      <UserSection>
        <strong>{`${userContext.Firstname} ${userContext.Lastname}`}</strong>
        <strong>{roleContext.Name}</strong>
      </UserSection>
    </Container>
  )
}

export default Header
