import { MantineThemeOverride } from "@mantine/core"

const fontFamily =
  'Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'

const defaultTheme: MantineThemeOverride = {
  loader: "bars",
  fontFamily,
  black: "#424242",
  defaultRadius: "md",
  headings: {
    fontFamily,
  },
  components: {
    Button: {
      defaultProps: {
        variant: "light",
      },
    },
    Card: {
      defaultProps: {
        p: "lg",
        radius: "lg",
        mx: "sm",
        withBorder: true,
      },
    },
    TextInput: {
      defaultProps: {
        mt: 10,
      },
    },
    Select: {
      defaultProps: {
        mt: 10,
        transition: "pop-top-left",
        maxDropdownHeight: 200,
        searchable: true,
      },
    },
    PasswordInput: {
      defaultProps: {
        mt: 10,
      },
    },
    Textarea: {
      defaultProps: {
        mt: 10,
      },
    },
    Checkbox: {
      defaultProps: {
        mt: 20,
      },
    },
    Overlay: {
      defaultProps: {
        blur: 1,
        zIndex: 10,
      },
    },
    ActionIcon: {
      defaultProps: {
        variant: "light",
        color: "blue",
      },
    },
    SimpleGrid: {
      defaultProps: {
        breakpoints: [{ maxWidth: "sm", cols: 1 }],
      },
    },
    Image: {
      defaultProps: {
        radius: "lg",
        imageProps: {
          loading: "lazy",
        },
      },
    },
    Menu: {
      defaultProps: {
        shadow: "md",
      },
    },
    Badge: {
      defaultProps: {},
      styles: {
        root: {
          paddingTop: 2,
        },
        leftSection: {
          marginTop: 4,
        },
      },
    },
  },
}

export default defaultTheme
