import dynamic from "next/dynamic";
import { memo } from "react";

const IconNameOptions = Object.freeze([
  "clear",
  "cloud",
  "icon_ripple_loading",
  "na",
  "rain",
  "refresh",
]);

const Icon = memo(({ name, ...rest }) => {
  if (!IconNameOptions.includes(name)) {
    throw new Error(`${name} is not defined in IconNameOptions`);
  }

  const DynamicIcon = dynamic(() => import(`/assets/icons/${name}.svg`));

  return <DynamicIcon {...rest} />;
});

Icon.displayName = "Icon";

export { IconNameOptions, Icon };
