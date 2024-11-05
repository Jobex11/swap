use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("2seCkRoLJbdPK8EL7Ae4HsG4B9yQTuu9TY9Tbym3QKME");

#[program]
pub mod multi_token_swap {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn fund_token1(ctx: Context<FundToken1>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token1_account.to_account_info(),
            to: ctx.accounts.contract_token1_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    pub fn fund_token2(ctx: Context<FundToken2>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token2_account.to_account_info(),
            to: ctx.accounts.contract_token2_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 32)]
    pub vault: Account<'info, Vault>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FundToken1<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_token1_account: Account<'info, TokenAccount>, // User's token1 account
    #[account(mut)]
    pub contract_token1_account: Account<'info, TokenAccount>, // Contract's token1 account
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct FundToken2<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub user_token2_account: Account<'info, TokenAccount>, // User's token2 account
    #[account(mut)]
    pub contract_token2_account: Account<'info, TokenAccount>, // Contract's token2 account
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Vault {
    pub token1: Pubkey,
    pub token2: Pubkey,
}

// vaultaccount ->DPdjqCCi8EmyUX2NNiXbgp5vyc8y9g9jQuZsHQ36kXvW
// contract token1Account -> 3a6Sx6uHCMorkkqJL1jQ7APh2FqDgHqu2cyQPWNmB9N7
// contract token2account -> 8QbFDWpwaLtQLshFnePA3erUyVuT7Lr8bNoWBTVANYjL
