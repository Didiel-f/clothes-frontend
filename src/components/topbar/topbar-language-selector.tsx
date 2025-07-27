"use client";

import MenuItem from "@mui/material/MenuItem";
import TouchRipple from "@mui/material/ButtonBase";
// MUI ICON COMPONENTS
import ExpandMore from "@mui/icons-material/ExpandMore";
// TRANSLATION
import { useTranslation } from "react-i18next";
// GLOBAL CUSTOM COMPONENTS
import BazaarMenu from "components/BazaarMenu";

// ==============================================================
interface LanguageOption {
  [key: string]: { title: string; value: string };
}
// ==============================================================

export default function LanguageSelector({ languages }: { languages: LanguageOption }) {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const selectedLanguage = languages[i18n.language];

  return (
    <BazaarMenu
      handler={(e) => (
        <TouchRipple className="handler marginRight" onClick={e}>
          <span className="menuTitle">{selectedLanguage.title}</span>
          <ExpandMore fontSize="inherit" />
        </TouchRipple>
      )}
      options={(onClose) => {
        return Object.keys(languages).map((lang) => (
          <MenuItem
            className="menuItem"
            key={languages[lang].title}
            onClick={() => {
              handleChangeLanguage(lang);
              onClose();
            }}>
            <span className="menuTitle">{languages[lang].title}</span>
          </MenuItem>
        ));
      }}
    />
  );
}
