import { animated, useTransition } from '@react-spring/web';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

type Direction = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: ReactElement;
  direction?: Direction;
}

const Tooltip = ({
  children,
  content,
  direction = 'top',
}: PropsWithChildren<TooltipProps>): JSX.Element => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const tooltipTransition = useTransition(isTooltipOpened, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 200,
    },
  });

  useEffect(() => {
    if (tooltipRef && tooltipRef.current) {
      tooltipRef.current.addEventListener('mouseenter', (): void =>
        setIsTooltipOpened(true),
      );

      tooltipRef.current.addEventListener('mouseleave', (): void =>
        setIsTooltipOpened(false),
      );

      return () => {
        tooltipRef.current?.removeEventListener('mouseleave', (): void =>
          setIsTooltipOpened(false),
        );

        tooltipRef.current?.removeEventListener('mouseenter', (): void =>
          setIsTooltipOpened(true),
        );
      };
    }
  }, []);

  return (
    <div className="relative">
      <div className="cursor-pointer" ref={tooltipRef}>
        {children}
      </div>
      {tooltipTransition((style, isOpened) => (
        <>
          {isOpened && (
            <animated.div
              style={{ ...style }}
              role="tooltip"
              className="prose prose-a:text-accent-blue absolute translate-y-full -bottom-2 w-fit z-10 bg-black/90 px-3 py-2 text-sm font-medium text-light-gray bg-gray-900 rounded-lg tooltip"
            >
              {content}
            </animated.div>
          )}
        </>
      ))}
    </div>
  );
};

export default Tooltip;
