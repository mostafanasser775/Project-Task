'use client'
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

export default function RemoveModal({ Style, id }: { Style: string, id: any }) {
    const [isOpen, setOpen] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axiosInstance.delete(`/products/${id}`,).then((res) => {
                router.refresh();
                toast.success('Product deleted successfully')
                setOpen(!isOpen)
                console.log(res)
            })

        } catch (error) {
            console.error('Failed to add category:', error)
        }




    }

    return (
        <>
            <button className={Style} onClick={() => setOpen(!isOpen)}>Delete</button>
            <Modal isOpen={isOpen} size="md" onOpenChange={() => setOpen(!isOpen)}  >
                <ModalContent>
                    {(onClose: any) => (
                        <>
                            <form className="mb-4 rounded" onSubmit={handleSubmit}>

                                <ModalHeader className="flex flex-col gap-1"> Delete Confirm</ModalHeader>
                                <ModalBody>
                                    <hr />

                                    <span className="text-2xl">Are you sure you want to delete product</span>
                                    <hr />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" type="submit" >
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </form>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
