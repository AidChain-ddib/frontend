import {
  Client,
  PrivateKey,
  AccountId,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
  TransferTransaction,
  AccountBalanceQuery,
} from "@hashgraph/sdk"

class HederaClient {
  private client: Client
  private operatorId: AccountId | null = null
  private operatorKey: PrivateKey | null = null

  constructor() {
    this.client = Client.forTestnet()
  }

  async connectWallet(accountId: string, privateKey: string) {
    try {
      this.operatorId = AccountId.fromString(accountId)
      this.operatorKey = PrivateKey.fromString(privateKey)
      this.client.setOperator(this.operatorId, this.operatorKey)

      const balance = await new AccountBalanceQuery().setAccountId(this.operatorId).execute(this.client)

      return {
        success: true,
        accountId: accountId,
        balance: balance.hbars.toString(),
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
      return { success: false, error: error.message }
    }
  }

  async createProject(contractId: string, projectData: any) {
    if (!this.operatorId || !this.operatorKey) {
      throw new Error("Wallet not connected")
    }

    try {
      const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(300000)
        .setFunction("createProject", [
          projectData.title,
          projectData.description,
          new Hbar(projectData.fundingGoal).toTinybars(),
          projectData.milestoneTitles,
          projectData.milestoneDescriptions,
          projectData.milestoneAmounts.map((amount) => new Hbar(amount).toTinybars()),
          projectData.milestoneDeadlines,
        ])

      const contractExecSubmit = await contractExecTx.execute(this.client)
      const contractExecRx = await contractExecSubmit.getReceipt(this.client)

      return {
        success: true,
        transactionId: contractExecSubmit.transactionId.toString(),
        receipt: contractExecRx,
      }
    } catch (error) {
      console.error("Project creation failed:", error)
      return { success: false, error: error.message }
    }
  }

  async donateToProject(contractId: string, projectId: number, amount: number) {
    if (!this.operatorId || !this.operatorKey) {
      throw new Error("Wallet not connected")
    }

    try {
      const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setPayableAmount(new Hbar(amount))
        .setFunction("donateToProject", [projectId])

      const contractExecSubmit = await contractExecTx.execute(this.client)
      const contractExecRx = await contractExecSubmit.getReceipt(this.client)

      return {
        success: true,
        transactionId: contractExecSubmit.transactionId.toString(),
        receipt: contractExecRx,
      }
    } catch (error) {
      console.error("Donation failed:", error)
      return { success: false, error: error.message }
    }
  }

  async stakeAsVerifier(contractId: string, stakeAmount: number) {
    if (!this.operatorId || !this.operatorKey) {
      throw new Error("Wallet not connected")
    }

    try {
      const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setPayableAmount(new Hbar(stakeAmount))
        .setFunction("stakeAsVerifier")

      const contractExecSubmit = await contractExecTx.execute(this.client)
      const contractExecRx = await contractExecSubmit.getReceipt(this.client)

      return {
        success: true,
        transactionId: contractExecSubmit.transactionId.toString(),
        receipt: contractExecRx,
      }
    } catch (error) {
      console.error("Staking failed:", error)
      return { success: false, error: error.message }
    }
  }

  async verifyMilestone(contractId: string, projectId: number, milestoneId: number, approve: boolean) {
    if (!this.operatorId || !this.operatorKey) {
      throw new Error("Wallet not connected")
    }

    try {
      const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(150000)
        .setFunction("verifyMilestone", [projectId, milestoneId, approve])

      const contractExecSubmit = await contractExecTx.execute(this.client)
      const contractExecRx = await contractExecSubmit.getReceipt(this.client)

      return {
        success: true,
        transactionId: contractExecSubmit.transactionId.toString(),
        receipt: contractExecRx,
      }
    } catch (error) {
      console.error("Milestone verification failed:", error)
      return { success: false, error: error.message }
    }
  }

  async getProjectDetails(contractId: string, projectId: number) {
    try {
      const contractCallQuery = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(50000)
        .setFunction("getProjectDetails", [projectId])

      const contractCallResult = await contractCallQuery.execute(this.client)

      return {
        success: true,
        data: contractCallResult,
      }
    } catch (error) {
      console.error("Failed to get project details:", error)
      return { success: false, error: error.message }
    }
  }

  async getMilestoneDetails(contractId: string, projectId: number, milestoneId: number) {
    try {
      const contractCallQuery = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(50000)
        .setFunction("getMilestoneDetails", [projectId, milestoneId])

      const contractCallResult = await contractCallQuery.execute(this.client)

      return {
        success: true,
        data: contractCallResult,
      }
    } catch (error) {
      console.error("Failed to get milestone details:", error)
      return { success: false, error: error.message }
    }
  }

  async getAccountBalance(accountId?: string) {
    const targetAccountId = accountId ? AccountId.fromString(accountId) : this.operatorId

    if (!targetAccountId) {
      throw new Error("No account ID provided")
    }

    try {
      const balance = await new AccountBalanceQuery().setAccountId(targetAccountId).execute(this.client)

      return {
        success: true,
        balance: balance.hbars.toString(),
        tokens: balance.tokens,
      }
    } catch (error) {
      console.error("Failed to get account balance:", error)
      return { success: false, error: error.message }
    }
  }

  async transferHBAR(toAccountId: string, amount: number) {
    if (!this.operatorId || !this.operatorKey) {
      throw new Error("Wallet not connected")
    }

    try {
      const transferTx = new TransferTransaction()
        .addHbarTransfer(this.operatorId, new Hbar(-amount))
        .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amount))

      const transferSubmit = await transferTx.execute(this.client)
      const transferRx = await transferSubmit.getReceipt(this.client)

      return {
        success: true,
        transactionId: transferSubmit.transactionId.toString(),
        receipt: transferRx,
      }
    } catch (error) {
      console.error("HBAR transfer failed:", error)
      return { success: false, error: error.message }
    }
  }
}

export const hederaClient = new HederaClient()
export default HederaClient
