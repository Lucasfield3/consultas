-- CreateTable
CREATE TABLE "funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "hash_senha" TEXT NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paciente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
