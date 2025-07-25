import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Chip,
  Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText,
  ListItemIcon, useTheme, useMediaQuery, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  ExpandMore as ExpandMoreIcon,
  FitnessCenter as ExerciseIcon,
  Timer as TimerIcon,
  DirectionsRun as WarmUpIcon,
  SelfImprovement as CoolDownIcon,
  Notes as NotesIcon,
  AccessTime as TimeIcon,
  Whatshot as WhatshotIcon
} from '@mui/icons-material';

// Types for the workout plan JSON
interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  rest?: string;
  equipment?: string;
  duration?: string;
}

interface WorkoutPlan {
  date: string;
  day: string;
  workout_type: string;
  focus_area: string;
  exercises: Exercise[];
  warm_up: Exercise[];
  cool_down: Exercise[];
  duration: string;
  intensity: string;
  notes: string;
}

interface Props {
  plan: WorkoutPlan;
  onClose?: () => void;
}

const SectionTitle: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box mr={1} display="flex" alignItems="center">
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
  </Box>
);

const WorkoutPlanViewer: React.FC<Props> = ({ plan, onClose }) => {
  if (!plan) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography>No workout plan available</Typography>
      </Box>
    );
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderExerciseCard = (exercise: Exercise, index: number) => (
    <Card key={index} sx={{ mb: 1, borderRadius: 2, boxShadow: 1 }}>
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{exercise.name}</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {exercise.sets && (
                <Chip
                  size="small"
                  label={`${exercise.sets} sets`}
                  variant="outlined"
                />
              )}
              {exercise.reps && (
                <Chip
                  size="small"
                  label={`${exercise.reps} reps`}
                  variant="outlined"
                />
              )}
              {exercise.rest && (
                <Chip
                  size="small"
                  icon={<TimerIcon fontSize="small" />}
                  label={`Rest: ${exercise.rest}`}
                  variant="outlined"
                />
              )}
              {exercise.equipment && (
                <Chip
                  size="small"
                  label={exercise.equipment}
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderSection = (title: string, items: Exercise[], icon: React.ReactNode) => (
    <Accordion
      expanded={expanded === title}
      onChange={handleChange(title)}
      elevation={0}
      sx={{
        '&:before': { display: 'none' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          '&.Mui-expanded': {
            minHeight: 48,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        <SectionTitle title={title} icon={icon} />
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, px: 2, pb: 2 }}>
        <List disablePadding>
          {items.map((item, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <svg width={8} height={8} viewBox="0 0 8 8" fill="currentColor">
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                secondary={item.duration && `Duration: ${item.duration}`}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box maxWidth={700} mx="auto" my={2} px={isMobile ? 1 : 4} position="relative">
      {onClose && (
        <IconButton 
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #3f51b5 0%, #1a237e 100%)',
          color: 'white',
          p: 3,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box position="absolute" right={16} top={16}>
            <Chip 
              label={plan.intensity} 
              color="secondary" 
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {plan.day}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {plan.workout_type}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
            <Chip
              icon={<TimeIcon />}
              label={plan.duration}
              size="small"
              sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              icon={<WhatshotIcon />}
              label={`Focus: ${plan.focus_area}`}
              size="small"
              sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 0 }}>
          <Box p={3}>
            {renderSection('Warm-Up', plan.warm_up, <WarmUpIcon />)}
            
            <Box mb={3}>
              <SectionTitle title="Main Exercises" icon={<ExerciseIcon />} />
              <Box mt={1}>
                {plan.exercises.map((exercise, index) => renderExerciseCard(exercise, index))}
              </Box>
            </Box>

            {renderSection('Cool Down', plan.cool_down, <CoolDownIcon />)}

            <Accordion
              expanded={expanded === 'notes'}
              onChange={handleChange('notes')}
              elevation={0}
              sx={{
                '&:before': { display: 'none' },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    minHeight: 48,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              >
                <SectionTitle title="Workout Notes" icon={<NotesIcon />} />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {plan.notes}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkoutPlanViewer;
