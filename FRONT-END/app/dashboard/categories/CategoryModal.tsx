'use client'
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";

export default function CategoryModal({ Action, title, Name, id, Style }: { Action: string, title: string, Name: string, id: any, Style: string }) {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState(Name || "")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (name === "") await setError("Required")
        if (name !== "" && name !== " ") {
            if (Action === "Add") {
                try {
                    await axiosInstance.post('/category', { name }).then((res) => {
                        router.refresh();
                        toast.success('Category added successfully')
                        setName('')
                        setOpen(!isOpen)
                        setError("")
                        console.log(res)
                    })

                } catch (error) {
                    console.error('Failed to add category:', error)
                }
            }
            else {
                try {
                    await axiosInstance.put(`/category/${id}`, { name }).then((res) => {
                        router.refresh();
                        toast.success('Category Edited successfully')
                        setName('');
                        setError("")

                        setOpen(!isOpen)
                        console.log(res)
                    })

                } catch (error) {
                    console.error('Failed to add category:', error)
                }
            }
        }


    }

    return (
        <>
            <button className={Style} onClick={() => setOpen(!isOpen)}>{title}</button>
            <Modal isOpen={isOpen} size="md" onOpenChange={() => setOpen(!isOpen)}  >
                {/* <button className={Style}>{title}</button> */}
                <ModalContent>
                    {(onClose: any) => (
                        <>
                            <form className="mb-4 rounded" onSubmit={handleSubmit}>

                                <ModalHeader className="flex flex-col gap-1">{Action === "add" ? "Add" : "Edit"} Category</ModalHeader>
                                <ModalBody>
                                    <hr />

                                    <div className="mb-4">
                                        <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="name">
                                            Name
                                        </label>
                                        <input required className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                                            id="name" type="text" value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <span className="text-red-600 text-small">{error}</span>

                                    </div>
                                    <hr />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit" >
                                        {Action === "Add" ? "Add" : "Edit"}
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
