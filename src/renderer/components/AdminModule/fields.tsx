import { useState } from 'react'
import { Button, Dialog, Pane, Paragraph, PropertyIcon } from 'evergreen-ui'

export default () => {
  const [isShown, setIsShown] = useState(false)
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        width='90%'
        title='Self managed close'
        onCloseComplete={() => setIsShown(false)}
      >
        {({ close }) => (
          <Pane>
            <Paragraph>Manage your own buttons and close interaction</Paragraph>
            <Button marginTop={16} onClick={close}>
              Self Managed Close
            </Button>
          </Pane>
        )}
      </Dialog>
      <Button
        width={300}
        onClick={() => setIsShown(true)}
        height={60}
        intent='success'
        iconBefore={PropertyIcon}
      >
        Administrar Formularios
      </Button>
    </Pane>
  )
}
