import React from "react";
import { BiLogoKubernetes } from "react-icons/bi";

const Footer = () => {
    const stylefont = {
        fontFamily:"'Alata', sans-serif"
    }
    return(
        <footer class="bg-gray-800">
            <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div class="flex justify-center text-white">
                    <BiLogoKubernetes className="mr-2 text-4xl text-blue-600" />
                    <h1 class="text-3xl font-bold" style={stylefont}>Sistema de Registro de Notas</h1>
                </div>

                <p class="mx-auto mt-6 max-w-full text-center leading-relaxed text-gray-500">
                Hecho por Rodrigo Alejandro Hernández de León con el carnet 201900042, <br></br>
                para el curso de Sistemas Operativos 1, Segundo Semestre 2023
                </p>

                <ul class="mt-5 flex justify-center gap-6 md:gap-8">

                    <li>
                        <a
                        href="https://github.com/rodrialeh01"
                        rel="noreferrer"
                        target="_blank"
                        class="text-gray-700 transition hover:text-gray-700/75"
                        >
                        <span class="sr-only">GitHub</span>
                        <svg
                            class="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd"
                            />
                        </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;