import { Dispatch, Fragment, SetStateAction, UIEventHandler, useCallback, useEffect, useRef } from "react"
import useDebounce from "../hooks/useDebounce"
import { Items } from "../types"


type TableProps = {
    items: Items
    slideWidth: number
    scrollLeft: number
    setOffsetX: Dispatch<SetStateAction<number>>

}

const FEATUTE_NAMES = [
    "Title N1",
    "Title N2",
    "Title N3",
    "Title N4",
    "Title N5",
]

const ON_SCROLL_DELAY = 250;

function Table({ items, slideWidth, scrollLeft, setOffsetX }: TableProps) {
    const tableWrapperRef = useRef<HTMLDivElement | null>(null)
    const tableRef = useRef<HTMLTableElement | null>(null)
    const featureNameRefs = useRef<HTMLSpanElement[]>([])

    useEffect(() => {
        if (!tableRef.current) return

        featureNameRefs.current = [
            ...tableRef.current.querySelectorAll('feature-name')
        ] as HTMLSpanElement[]
    }, [])

    useEffect(() => {
        if (!tableWrapperRef.current || featureNameRefs.current.length) return

        tableWrapperRef.current.scrollLeft = scrollLeft

        featureNameRefs.current.forEach(element => {
            element.style.left = `${scrollLeft}px`
        })
    }, [scrollLeft])

    const onScroll: UIEventHandler<HTMLDivElement> = useCallback(() => {
        if (!tableRef.current) return
        const { x } = tableRef.current.getBoundingClientRect()
        setOffsetX(Math.abs(x))
    }, [])

    const onDebounceScroll = useDebounce(onScroll, ON_SCROLL_DELAY)

    return (
        <div className="table-wrapper" ref={tableWrapperRef} onScroll={onDebounceScroll}>
            <table ref={tableRef}>
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