#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

// Função para remover diretórios de forma recursiva
function removeDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const currentPath = path.join(dirPath, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                removeDirectory(currentPath);
            } else {
                fs.unlinkSync(currentPath); // Remove o arquivo
            }
        });
        fs.rmdirSync(dirPath); // Remove o diretório
    }
}

// Remove o histórico do Git
const gitPath = path.join(projectPath, ".git");
console.log("\nRemovendo histórico do Git...\n");
removeDirectory(gitPath);

// Finaliza o processo com mensagem
console.log("Template clonado com sucesso!");
console.log(`\nPara começar:\n`);
console.log(`cd ${projectName}`);
console.log("npm install");
console.log("npm run dev");
