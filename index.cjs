#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

// Obtém os argumentos passados
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Por favor, forneça um nome para o projeto.");
    process.exit(1);
}

const projectName = args[0];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

// Mensagem de início
console.log(`\nClonando o template para ${projectPath}...\n`);

// Clona o repositório template
execSync(`git clone https://github.com/scaique/template-react.git ${projectPath}`, { stdio: "inherit" });

// Remove o histórico do Git
const gitPath = path.join(projectPath, ".git");
if (fs.existsSync(gitPath)) {
    console.log("\nRemovendo histórico do Git...\n");
    console.log(`Diretório: ${gitPath}\n`);
    rimraf.sync(gitPath); // Usando rimraf para remover o diretório
    if (fs.existsSync(gitPath)) {
        fs.unlinkSync(gitPath); // Se rimraf falhar, tenta remover o arquivo diretamente
    } else {
        console.log("\nHistórico do Git removido com sucesso.\n");
    }
} else {
    console.log("\nNenhum diretório .git encontrado para remover.\n");
}

// Finaliza o processo com mensagem
console.log("Template clonado com sucesso!");
console.log(`\nPara começar:\n`);
console.log(`cd ${projectName}`);
console.log("npm install");
console.log("npm run dev");
