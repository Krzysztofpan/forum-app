import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'

const loading = () => {
  return (
    <Modal>
      <DialogContent className="flex items-center justify-center w-[600px] h-[40vh]">
        <DialogTitle>
          <Spinner />
        </DialogTitle>
      </DialogContent>
    </Modal>
  )
}

export default loading
