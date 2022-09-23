import React from "react"
import MuiDrawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Drawer({
  facets,
  // values,
  facet, setFacet,
  filters, setFilters,
  // value, setValue,
  // optControlled, setOptControlled
}) {

  const drawerWidth = 300

  return(
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        
        {/* <ListItem
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => setOptControlled(!optControlled)}
              checked={optControlled}
            />
          }
        >
          <ListItemText primary="Controlled FIs only" />
        </ListItem> */}

        {/* <Divider />
        <ListSubheader>หน่วย</ListSubheader>
        <ListItem>
          <RadioGroup defaultValue={value}>
            {Object.keys(values).map(v =>
              <FormControlLabel
                key={v}
                value={v}
                control={<Radio />}
                label={values[v]}
                onChange={() => setValue(v)}
              />
            )}
          </RadioGroup>
        </ListItem> */}

        {/* <Divider /> */}
        <ListSubheader>แยกประเภท</ListSubheader>
        <ListItem>
          <RadioGroup
            // defaultValue={facet}
            value={facet}
            onChange={event => setFacet(event.target.value)}
          >
            {Object.keys(facets).map(f =>
              <FormControlLabel
                key={f}
                value={f}
                control={<Radio />}
                label={facets[f].label}
              />
            )}
          </RadioGroup>
        </ListItem>

        <Divider />
        <ListSubheader>Filters</ListSubheader>
          {
            Object.keys(facets).map(filterType => {
              return(
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel>{facets[filterType].label}</InputLabel>
                    <Select
                      labelId={filterType}
                      value={filters[filterType]}
                      label={facets[filterType].label}
                      multiple={facets[filterType].type !== "single"}
                      onChange={event => {
                        setFilters({
                          ...filters,
                          [filterType]: facets[filterType].type !== "single" ? event.target.value : [event.target.value],
                        })
                      }}
                    >
                      {
                        Object.keys(facets[filterType].groups).map(x => {
                          return(
                            <MenuItem
                              value={parseInt(x)}
                            >
                              {facets[filterType].groups[x].label}
                            </MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </ListItem>
              )
            })
          }

      </List>
    </MuiDrawer>
  )

}