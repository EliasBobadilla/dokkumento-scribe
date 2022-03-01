/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import {
  Button,
  SelectMenu,
  TagInput,
  EditIcon,
  ManualIcon,
  Avatar,
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
  tags: string[]
  setTags: (value: string[]) => void
}

const Header = ({
  selectedProjectId,
  setSelectedProjectId,
  selectedFormId,
  setSelectedFormId,
  currentRole,
  tags,
  setTags,
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
    if (!values || !values.length) return
    const lastItem = values.pop()
    setTags([lastItem.toUpperCase()])
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
          values={tags}
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
      <Avatar
        style={{ position: 'absolute', right: '1em' }}
        name={`${userContext.firstname} ${userContext.lastname}`}
        size={40}
      />
    </Container>
  )
}

export default Header
