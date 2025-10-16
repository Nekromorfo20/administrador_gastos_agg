import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state : BudgetState
    dispatch : Dispatch<BudgetActions>
    totalExpenses : number
    remainingBudget : number
}

type BudgetProviderProps = {
    children : ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!) 

export const BudgetProvider = ({ children } : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Calculo global de gastos totales y sobrante
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}