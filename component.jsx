/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DST4fgxPY1n
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function Component() {
  return (
    <div className="flex min-h-screen">
      <aside className="flex flex-col items-center w-20 bg-gray-900 text-white p-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <nav className="mt-4 space-y-4">
          <Button variant="ghost" size="icon">
            <HomeIcon className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <FolderIcon className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <SettingsIcon className="w-6 h-6" />
          </Button>
        </nav>
        <div className="mt-auto space-y-4">
          <Button variant="ghost" size="icon">
            <SunIcon className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <PanelLeftCloseIcon className="w-6 h-6" />
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-6">Inicio</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Datos Sobre Mi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Mi Nombre es Damián. Aquí mostraré todos mis códigos, proyectos y el proceso de aprendizaje de
                  programación que he realizado en estos años, en el cuales algunos son hechos en java otros en html,
                  php.
                </li>
                <li>
                  Mi objetivo principal es obtener una titulación en Ingeniería Informática, lo que me permitirá
                  adquirir un profundo conocimiento en esta disciplina. Además, aspiro a utilizar esta formación
                  académica como base para iniciar mi carrera profesional en un rol relacionado con la informática,
                  donde pueda aplicar de manera efectiva mis habilidades y conocimientos adquiridos. A largo plazo,
                  tengo la ambición de emprender y establecer mi propia empresa en el sector de la tecnología, donde
                  pueda contribuir al desarrollo de soluciones innovadoras y tecnológicas para satisfacer las
                  necesidades del mercado y la sociedad en la que se vivirá hoy en día.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Intereses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Programación</li>
                <li>Robótica</li>
                <li>Música</li>
                <li>Películas y Series</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Habilidades Profesionales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Realizar Mantenimiento de diferentes equipos de forma interna y externa</li>
                <li>Realizar limpieza a los equipos y dispositivos</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <Link href="#" className="text-yellow-400" prefetch={false}>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-green-400" prefetch={false}>
                    Kick
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-yellow-500" prefetch={false}>
                    Github
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 text-white col-span-2">
            <CardHeader>
              <CardTitle>Lenguajes de Programación Adquiridos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>HTML</Label>
                  <Progress value={75} className="w-full" />
                </div>
                <div>
                  <Label>CSS</Label>
                  <Progress value={67} className="w-full" />
                </div>
                <div>
                  <Label>PHP</Label>
                  <Progress value={56} className="w-full" />
                </div>
                <div>
                  <Label>BOOTSTRAP</Label>
                  <Progress value={45} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function PanelLeftCloseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}