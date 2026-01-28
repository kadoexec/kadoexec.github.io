# 🚀 Como Subir seu Portfólio no GitHub Pages

## Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Nome do repositório: `seu-usuario.github.io` (exemplo: `kadoexec.github.io`)
   - **IMPORTANTE**: Use exatamente esse formato para ter o site em `https://seu-usuario.github.io`
5. Deixe como **Public**
6. **NÃO** marque "Initialize with README"
7. Clique em **"Create repository"**

## Passo 2: Preparar o Projeto para Deploy

### Instalar gh-pages

No terminal do projeto, execute:

```bash
npm install --save-dev gh-pages
```

### Atualizar package.json

Adicione estas linhas no `package.json`:

```json
{
  "homepage": "https://seu-usuario.github.io",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Substitua `seu-usuario` pelo seu username do GitHub!**

## Passo 3: Configurar Git Local

No terminal, dentro da pasta do projeto:

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Portfolio"

# Adicionar o repositório remoto
git remote add origin https://github.com/seu-usuario/seu-usuario.github.io.git

# Enviar para o GitHub
git push -u origin main
```

## Passo 4: Fazer Deploy

Execute o comando de deploy:

```bash
npm run deploy
```

Isso vai:
1. Criar o build de produção
2. Criar uma branch `gh-pages`
3. Fazer upload automático para o GitHub

## Passo 5: Configurar GitHub Pages

1. Vá no seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Clique em **Save**

## ✅ Pronto!

Seu site estará disponível em: `https://seu-usuario.github.io`

Pode levar alguns minutos para ficar online na primeira vez.

---

## 🔄 Atualizações Futuras

Sempre que fizer mudanças:

```bash
# 1. Salvar mudanças
git add .
git commit -m "Descrição da mudança"
git push

# 2. Fazer deploy
npm run deploy
```

---

## 🆘 Problemas Comuns

### Erro: "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

### Erro: "Permission denied"
```bash
git remote set-url origin https://github.com/seu-usuario/seu-usuario.github.io.git
```

### Site não atualiza
- Aguarde 5-10 minutos
- Limpe o cache do navegador (Ctrl + Shift + Delete)
- Verifique se o deploy foi bem sucedido: `Actions` no GitHub

---

## 📝 Comandos Úteis

```bash
# Ver status do git
git status

# Ver histórico de commits
git log --oneline

# Desfazer mudanças não commitadas
git checkout .

# Ver repositório remoto
git remote -v
```

---

**Dica**: Sempre teste localmente com `npm run dev` antes de fazer deploy!
