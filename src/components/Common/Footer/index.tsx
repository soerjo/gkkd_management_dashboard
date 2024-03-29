import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

const data = {
    brandName: "Soerjo Production",
    brandLink: "#",
    routes: [
        { name: "About Us", path: "#" },
        { name: "Blog", path: "#" },
        { name: "License", path: "#" },
    ],
}

export function Footer() {
    const { brandName, brandLink, routes } = data;
    const year = new Date().getFullYear();

    return (
        <>
            <div className="h-16 md:h-12" />
            <footer className="py-2 absolute bottom-0 right-0 w-full">
                <div className="flex w-full flex-wrap items-center px-2 justify-between">
                    <Typography variant="small" className="font-normal text-inherit text-xs md:text-sm">
                        &copy; {year}, made with{" "}
                        <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
                        <a
                            href={brandLink || ""}
                            target="_blank"
                            className="transition-colors hover:text-blue-500 font-bold"
                        >
                            {brandName || ""}
                        </a>{" "}
                        for a better web.
                    </Typography>
                    <ul className="flex items-center gap-4">
                        {routes.map(({ name, path }) => (
                            <li key={name}>
                                <Typography
                                    as="a"
                                    href={path}
                                    target="_blank"
                                    variant="small"
                                    className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                                >
                                    {name || ""}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            </footer>
        </>
    );
}

export default Footer;
