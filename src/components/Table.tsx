import { Fragment } from "react"
import { Items } from "../types"


type TableProps = {
    items: Items
    slideWidth: number
}

const FEATUTE_NAMES = [
    "Title N1",
    "Title N2",
    "Title N3",
    "Title N4",
    "Title N5",
]

function Table({ items, slideWidth }: TableProps) {
    return (
        <div className="table-wrapper">
            <table>
                <tbody>
                    {items.map((item, index) => (
                        <Fragment key={item.id}>
                            <tr className="feature-name-row">
                                <td colSpan={items.length}>
                                    <span className="feature-name">{FEATUTE_NAMES[index]}</span>
                                </td>
                            </tr>
                            <tr
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${items.length}, ${slideWidth}px)`

                                }}
                            >
                                {items.map((_, j) => {
                                    const key = "" + index + j;
                                    return <td key={key}>{items[j].features[index].value}</td>;
                                })}
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Table