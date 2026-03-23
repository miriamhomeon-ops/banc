export interface Transaction {
  id: string
  date: Date
  label: string
  amount: number
  type: "credit" | "debit"
}

// Generate CDI transactions starting from September 1st 2025
// Daily earnings follow a linear progression from R$ 8.50 to R$ 11.25
export function generateTransactions(): Transaction[] {
  const transactions: Transaction[] = []
  const startDate = new Date(2025, 8, 1) // September 1st 2025
  const today = new Date()
  
  // Reset time to midnight for accurate day calculation
  startDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  // Calculate number of days
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // Linear progression parameters
  const startValue = 8.50   // Starting daily CDI earnings (September 2025)
  const endValue = 11.25    // Final daily CDI earnings (today)
  
  // Calculate the daily increment for linear progression
  const dailyIncrement = daysDiff > 0 ? (endValue - startValue) / daysDiff : 0
  
  // Create transactions with linear progression
  for (let i = 0; i <= daysDiff; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    // Calculate amount using linear interpolation
    const amount = parseFloat((startValue + (dailyIncrement * i)).toFixed(2))
    
    transactions.push({
      id: `cdi-${i}`,
      date,
      label: "Rendimento CDI",
      amount,
      type: "credit"
    })
  }
  
  // Sort by date descending (most recent first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return "Hoje"
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Ontem"
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  }).format(date)
}

export function groupTransactionsByDate(transactions: Transaction[]): Map<string, Transaction[]> {
  const grouped = new Map<string, Transaction[]>()
  
  for (const transaction of transactions) {
    const dateKey = transaction.date.toDateString()
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, [])
    }
    grouped.get(dateKey)!.push(transaction)
  }
  
  return grouped
}
