/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  Button,
  SelectMenu,
  TagInput,
  EditIcon,
  ManualIcon,
} from 'evergreen-ui'
import { useAppContext } from '../../context'
import { UserSection, Container, Section } from './styles'
import { RoleDto } from '../../dtos/management'
import {
  getFieldTypes,
  getFormFields,
  getForms,
  getProjects,
} from '../../helpers/db'

export interface Props {
  selectedProjectId: number
  setSelectedProjectId: (value: number) => void
  selectedFormId: number
  setSelectedFormId: (value: number) => void
  currentRole?: RoleDto
}

const Header = ({
  selectedProjectId,
  setSelectedProjectId,
  selectedFormId,
  setSelectedFormId,
  currentRole,
}: Props) => {
  const {
    language,
    userContext,
    projectContext,
    formContext,
    setFieldTypeContext,
    setFormContext,
    setFormFieldContext,
    setProjectContext,
  } = useAppContext()

  const projectList = projectContext.map((p) => ({
    label: p.name,
    value: p.id,
  }))

  const formList = formContext.map((p) => ({
    label: p.name,
    value: p.id,
  }))

  const [batch, setBatch] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const [fieldTypes, projects] = await Promise.all([
        getFieldTypes(),
        getProjects(),
      ])
      setFieldTypeContext(fieldTypes)
      setProjectContext(projects)
    })()
  }, [])

  useEffect(() => {
    if (!selectedProjectId) return
    ;(async () => {
      const [forms, formFields] = await Promise.all([
        getForms(selectedProjectId),
        getFormFields(selectedProjectId),
      ])
      setFormContext(forms)
      setFormFieldContext(formFields)
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
          title={language.projectButtonPlaceholder}
          options={projectList}
          selected={selectedProjectId.toString()}
          hasFilter={false}
          hasTitle={false}
          onSelect={(item) => setSelectedProjectId(+item.value)}
        >
          <Button width='100%' iconBefore={ManualIcon}>
            {projectList.find((x) => x.value === selectedProjectId)?.label ||
              language.projectButtonPlaceholder}
          </Button>
        </SelectMenu>
      </Section>
      <Section>
        <SelectMenu
          title={language.formButtonPlaceholder}
          options={formList}
          selected={selectedFormId.toString()}
          hasFilter={false}
          hasTitle={false}
          onSelect={(item) => setSelectedFormId(+item.value)}
        >
          <Button width='100%' iconBefore={EditIcon}>
            {formList.find((x) => x.value === selectedFormId)?.label ||
              language.formButtonPlaceholder}
          </Button>
        </SelectMenu>
      </Section>
      <Section>
        <TagInput
          inputProps={{ placeholder: language.batchLabelPlaceHolder }}
          values={batch}
          width='100%'
          disabled={selectedFormId <= 0 || selectedProjectId <= 0}
          onChange={(values) => {
            handleBatchChange(values)
          }}
        />
      </Section>
      <UserSection>
        <strong>{`${userContext.firstname} ${userContext.lastname}`}</strong>
        {currentRole?.name}
      </UserSection>
    </Container>
  )
}

export default Header
