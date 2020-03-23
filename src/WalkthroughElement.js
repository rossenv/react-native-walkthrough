import React from "react"
import PropTypes from "prop-types"
import Tooltip, {
  TooltipChildrenContext
} from "react-native-walkthrough-tooltip"

import { WalkthroughContext } from "./ContextWrapper"

const WalkthroughElement = props => {
  const elementId = props.id

  const defaultPlacement =
    React.Children.count(props.children) === 0 ? "center" : "top"

  return (
    <WalkthroughContext.Consumer>
      {({ currentElement, goToNext }) => {
        const defaultTooltipProps = {
          useInteractionManager: true,
          isVisible: elementId === currentElement.id,
          content: props.content || currentElement.content,
          placement: currentElement.placement || defaultPlacement,
          onClose: () => {
            // goToNext();

            if (typeof currentElement.onClose === "function") {
              currentElement.onClose()
            }
          }
        }

        const tooltipProps = {
          ...defaultTooltipProps,
          ...currentElement.tooltipProps,
          ...props.tooltipProps
        }

        return (
          <Tooltip {...tooltipProps}>
            {props.useTooltipChildContext ? (
              <TooltipChildrenContext.Consumer>
                {props.children}
              </TooltipChildrenContext.Consumer>
            ) : (
              props.children
            )}
          </Tooltip>
        )
      }}
    </WalkthroughContext.Consumer>
  )
}

WalkthroughElement.defaultProps = {
  content: null,
  tooltipProps: {},
  useTooltipChildContext: false
}

WalkthroughElement.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  id: PropTypes.string.isRequired,
  tooltipProps: PropTypes.object,
  useTooltipChildContext: PropTypes.bool
}

export default WalkthroughElement
