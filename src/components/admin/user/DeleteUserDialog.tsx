
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  usersToDelete: string[];
  onDelete: () => void;
}

export const DeleteUserDialog = ({
  open,
  setOpen,
  usersToDelete,
  onDelete
}: DeleteUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete {usersToDelete.length === 1 ? 'this user' : 'these users'} 
            and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
          >
            {usersToDelete.length === 1 ? 'Delete User' : `Delete ${usersToDelete.length} Users`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
