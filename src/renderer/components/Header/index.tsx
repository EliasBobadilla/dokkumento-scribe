/* eslint-disable react-hooks/exhaustive-deps */
import {
  EditOutlined,
  FolderOpenOutlined,
  FormOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Input, Menu } from 'antd'
import { useAppContext } from '../../context'
import { Container, Section, UserSection } from './styles'
import { RoleDto, RoleEnums } from '../../../dtos/role'

export interface Props {
  selectedProjectId: number
  setSelectedProjectId: (value: number) => void
  selectedFormId: number
  setSelectedFormId: (value: number) => void
  currentRole?: RoleDto
  tag: string
  module: string
  setTag: (value: string) => void
  setModule: (value: string) => void
}

export default ({
  selectedProjectId,
  setSelectedProjectId,
  setSelectedFormId,
  currentRole,
  module,
  setTag,
  setModule,
}: Props) => {
  const { language, userContext, projectContext, formContext } = useAppContext()

  const projectMenu = (
    <Menu onClick={(e) => setSelectedProjectId(+e.key)}>
      {projectContext.map((p) => (
        <Menu.Item key={p.id} icon={<FolderOpenOutlined />}>
          {p.name}
        </Menu.Item>
      ))}
    </Menu>
  )

  const formMenu = (
    <Menu onClick={(e) => setSelectedFormId(+e.key)}>
      {formContext
        .filter((x) => x.projectId === selectedProjectId)
        .map((p) => (
          <Menu.Item key={p.id} icon={<EditOutlined />}>
            {p.name}
          </Menu.Item>
        ))}
    </Menu>
  )

  const moduleMenu = (
    <Menu onClick={(e) => setModule(e.key)}>
      {Object.entries(RoleEnums).map(([key, value]) => (
        <Menu.Item key={key}>{value}</Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Container>
      {module === 'TYPIST' && (
        <>
          <Section>
            <Dropdown overlay={projectMenu}>
              <Button type='primary' block size='large'>
                {language.header.projectPlaceholder} <FolderOpenOutlined />
              </Button>
            </Dropdown>
          </Section>
          <Section>
            <Dropdown overlay={formMenu}>
              <Button type='primary' block size='large'>
                {language.header.formPlaceholder} <FormOutlined />
              </Button>
            </Dropdown>
          </Section>
          <Section>
            <Input
              allowClear
              size='large'
              style={{ width: '100%' }}
              prefix={<InboxOutlined />}
              placeholder={language.commons.tag}
              onChange={(e) => setTag(e.target.value.toUpperCase())}
            />
          </Section>
        </>
      )}
      <UserSection>
        <strong>{`${userContext.firstname} ${userContext.lastname}`}</strong>
        {currentRole?.name}
      </UserSection>
      <Dropdown overlay={moduleMenu}>
        <Avatar
          style={{
            backgroundColor: '#FF4821',
            verticalAlign: 'middle',
            position: 'absolute',
            right: '1.5em',
            cursor: 'pointer',
          }}
          size='large'
        >
          {`${userContext.firstname.charAt(0)}${userContext.lastname.charAt(
            0,
          )}`}
        </Avatar>
      </Dropdown>
    </Container>
  )
}
