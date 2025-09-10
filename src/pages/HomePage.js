import EmpList from "../components/EmpList";
import TabelesStatus from "../components/TablesStatus";
import TableSet from "./TableSet";
export default function HomePage() {
    return(
        <>
        <TableSet />
        <TabelesStatus />
        <EmpList />
        
        </>
    );
}