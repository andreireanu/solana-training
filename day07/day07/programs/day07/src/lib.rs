use anchor_lang::prelude::*;

declare_id!("Cv8nkQ7yTKhxg4LcnenmAUkAERG3JEv93W4aUqSG1mx7");

#[program]
pub mod day07 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
