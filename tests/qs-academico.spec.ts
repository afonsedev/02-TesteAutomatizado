import { test, expect } from '@playwright/test';

test.describe('QS Acadêmico — Testes do Sistema de Notas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://afonsedev.github.io/02-TesteAutomatizado/');
  });

  // ========== GRUPO 1: Cadastro de Alunos ==========

  test.describe('Cadastro de Alunos', () => {

    test('deve cadastrar um aluno com dados válidos', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('João Silva');
      await page.getByLabel('Nota 1').fill('7');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('6');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      // Verificar que o aluno aparece na tabela
      const linhas = page.locator('#tabela-alunos tbody tr');
      const linhaJoao = linhas.filter({ hasText: 'João Silva' });

      await expect(linhas).toHaveCount(1);
      await expect(linhaJoao).toHaveCount(1);
    });

    test('deve exibir mensagem de sucesso após cadastro', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('Ana Costa');
      await page.getByLabel('Nota 1').fill('9');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('10');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      await expect(page.locator('#mensagem')).toContainText('cadastrado com sucesso');
    });

    test('não deve cadastrar aluno sem nome', async ({ page }) => {
      await page.getByLabel('Nota 1').fill('7');
      await page.getByLabel('Nota 2').fill('8');
      await page.getByLabel('Nota 3').fill('6');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      // A tabela deve continuar sem dados reais
      await expect(page.locator('#tabela-alunos tbody td.texto-central')).toBeVisible();
    });

  });

  // ========== GRUPO 2: Cálculo de Média ==========

  test.describe('Cálculo de Média', () => {

    test('deve calcular a média aritmética das três notas', async ({ page }) => {
      await page.getByLabel('Nome do Aluno').fill('Pedro Santos');
      await page.getByLabel('Nota 1').fill('8');
      await page.getByLabel('Nota 2').fill('6');
      await page.getByLabel('Nota 3').fill('10');

      await page.getByRole('button', { name: 'Cadastrar' }).click();

      // Média esperada: (8 + 6 + 10) / 3 = 8.00
      const celulaMedia = page.locator('#tabela-alunos tbody tr').first().locator('td').nth(4);
      await expect(celulaMedia).toHaveText('8.00');
    });

  });

  // ========== Validação de Notas =========//
    test.describe('Validação de Notas', () => {
        test('test', async ({ page }) => {
    await page.goto('https://afonsedev.github.io/02-TesteAutomatizado/');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('afonso');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('11');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('-4');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('-2');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    });
    });

    //---------- Teste de Busca por Nome ==========//
    test.describe('Busca por Nome', () => {
            test('test', async ({ page }) => {
    await page.goto('https://afonsedev.github.io/02-TesteAutomatizado/');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).dblclick();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso Anjos');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('10');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('9');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('7');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).press('Tab');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('B');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Bianca ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Bianca S');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Bianca Silva');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('5');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('7');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('8');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('A');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).click();
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).fill('a');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).fill('A');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).fill('Af');
    });
    });


    //---------- Teste de Exclusão ==========//
    test.describe('Exclusão de Alunos', () => {
            test('test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('S');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Silva');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('6');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('8');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('5');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('S');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).click();
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).fill('S');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Buscar por nome' }).fill('Silva');
    await page.getByRole('button', { name: 'Excluir Silva' }).click();
    });
    });

    //---------- Teste de Estatísticas ==========//
    test.describe('Estatísticas', () => {
            test('test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('L');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Leo ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Leo S');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Leo Soares');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('9');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('8');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('7');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('W');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('End');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir j');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir J');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir Junior');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('3');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('2');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('1');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('DS');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Davi ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Davi A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Davi Alves');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('9');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('5');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('6');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('8');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    });
    });

    //---------- Teste de Situação: Aprovado ==========//
    test.describe('Situação do Aluno', () => {
            test('test', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('m');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('M');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Mario ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Mario S');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Mario Silva');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('9');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('8');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('9');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    });
    });

    //---------- Teste de Situação: Reprovado ==========//
    test.describe('Situação do Aluno Reprovado', () => {
            test('test', async ({ page }) => {
                await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
                await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
                await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('G');
                await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
                await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Guilherme');
                await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
                await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('3');
                await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
                await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('2');
                await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
                await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('1');
                await page.getByRole('button', { name: 'Cadastrar' }).click();
                });
    });

    //--Teste de múltiplos cadastros ==========//
    test.describe('Múltiplos Cadastros', () => {
                test('test', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
        await page.getByRole('button', { name: 'Limpar Tudo' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('A');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso ');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso A');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso Anjos');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('6');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('7');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('3');
        await page.getByRole('spinbutton', { name: 'Nota 3' }).press('Tab');
        await page.getByRole('button', { name: 'Cadastrar' }).click();
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('W');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir ');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir J');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Walmir Junior');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('8');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('7');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('4');
        await page.getByRole('button', { name: 'Cadastrar' }).click();
        await page.locator('div').nth(2).click();
        await page.getByRole('spinbutton', { name: 'Nota 1' }).press('CapsLock');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).press('CapsLock');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('');
        await page.locator('div').nth(2).click();
        await page.locator('div').nth(2).click();
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('G');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Guilherme ');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Guilherme F');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
        await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Guilherme Figueira');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).click();
        await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('1');
        await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('10');
        await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
        await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('10');
        await page.getByRole('button', { name: 'Cadastrar' }).click();
        });
    });


    //---------- Teste de Situação: Recuperação ==========//
    test.describe('Situação do Aluno Recuperação', () => {
            test('test', async ({ page }) => {
    await page.getByText('Nome do Aluno').click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).click();
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso ');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso A');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).fill('Afonso A.');
    await page.getByRole('textbox', { name: 'Nome do Aluno' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).fill('1');
    await page.getByRole('spinbutton', { name: 'Nota 1' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).fill('10');
    await page.getByRole('spinbutton', { name: 'Nota 2' }).press('Tab');
    await page.getByRole('spinbutton', { name: 'Nota 3' }).fill('10');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    });
    });
});