"use client";

import { ROOT_NODE, useEditor, useNode } from "@craftjs/core";
import { ArrowUp, Move, Trash } from "lucide-react";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const RenderNode = ({ render }: { render: ReactElement }) => {
  const { id } = useNode();
  const { isActive, query, actions } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));
  const { dom, isHover, name, connectors, moveable, deletable, parent } =
    useNode((node) => {
      return {
        dom: node.dom,
        isHover: node.events.hovered,
        name: node.data.name,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
      };
    });

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom!);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={currentRef}
              className="fixed flex -translate-y-full items-center bg-blue-500 p-1 text-sm text-white"
              style={{
                left: getPos(dom!).left,
                top: getPos(dom!).top,
                zIndex: 2,
              }}
            >
              <h2 className="mr-3 flex-1">{name ?? "Unknow"}</h2>
              {moveable ? (
                <div className="mr-2 cursor-move" ref={connectors.drag as any}>
                  <Move size={16} />
                </div>
              ) : null}
              {id !== ROOT_NODE && (
                <div
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent as string);
                  }}
                >
                  <ArrowUp size={16} />
                </div>
              )}
              {deletable ? (
                <div
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Trash size={16} />
                </div>
              ) : null}
            </div>,
            document.querySelector(".page-container")!,
          )
        : null}
      {render}
    </>
  );
};

export default RenderNode;
