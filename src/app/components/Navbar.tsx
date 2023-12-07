import React from "react";
import Link from "next/link";
import Image from "next/image";
import { convertImage, toBase64 } from "@/helpers/image";

interface NavbarProps {
    onAddEmployee?: () => void;
    onEditEmployee?: () => void;
    onViewEmployeeList?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    onAddEmployee,
    onEditEmployee,
    onViewEmployeeList,
}) => {
    return (
        <>
            <h1>Employee Dashboard</h1>
            <nav>
                <Link href="/employee">
                    <Image
                        src={'/logo.svg'}
                        alt="logo"
                        width={50}
                        height={50}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            convertImage(700, 475)
                        )}`}
                    />
                </Link>
                <Link href="/employee/list">List</Link>
                <Link href="/employee/add">Add</Link>
                <Link href="/employee/edit">Edit</Link>
            </nav>
        </>
    );
};

export default Navbar;
