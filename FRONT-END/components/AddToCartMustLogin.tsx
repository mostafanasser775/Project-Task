'use client'
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartMustLogin() {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            router.push("/login")
        } catch (error) {
            console.error('Failed to add category:', error)
        }



    


}

return (
    <>
        <Button  radius='sm'
           variant='bordered' onPress={()=>setOpen(!isOpen)} >ADD TO BASKET</Button>
        <Modal isOpen={isOpen} size="md" onOpenChange={() => setOpen(!isOpen)}  >
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <form className="mb-4 rounded" onSubmit={handleSubmit}>

                            <ModalHeader className="flex flex-col gap-1">Login </ModalHeader>
                            <ModalBody>
                                <hr />

                                <div className="mb-4">
                                    <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="name">
                                        You must login to add products to cart
                                    </label>
                                </div>
                                <hr />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" >
                                    Go to login
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
